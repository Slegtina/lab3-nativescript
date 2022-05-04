import { Observable, ObservableArray, View, EventData, ShowModalOptions } from '@nativescript/core'
import { Todo, loadFromMem, removeFromMem, loadKeys} from './store'

export class ToDoModel extends Observable {
  todoArray: ObservableArray<Todo>; // массив задач

  constructor() {
    super()
    this.todoArray = new ObservableArray<Todo>();
    this.updateArrayFromMemory();
  }

  private updateArrayFromMemory(){
    this.todoArray.splice(0);       // На всякий случай очищаем массив, так надо
    let keys = loadKeys();          // Получаем все ключи из памяти
    keys.forEach(key => {           // проходим циклом по каждому ключу
      let todo = <Todo>loadFromMem(key);  // Заргужаем объект по ключу
      this.todoArray.push(todo);    // Вставляем в массив
    });
  }

  addNewTodo(args: EventData){            // тут вызываем окно для добавления новой задачи
    const view: View = <View>args.object;
    const options = <ShowModalOptions>{
      animated: true,
      fullscreen: true,
      context: null,
      closeCallback: () =>{this.updateArrayFromMemory();} // после закрытия окна обновляем массив задач
    };
    view.showModal("add-root", options);
  }
}
