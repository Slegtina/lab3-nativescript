import { Observable, ObservableArray, View, EventData, ShowModalOptions, ItemEventData } from '@nativescript/core'
import { Todo, loadFromMem, loadKeys} from './store'

export class ToDoModel extends Observable {
  todoArray: ObservableArray<Todo>; // массив задач
  doneArray: ObservableArray<Todo>; // массив выполненных задач

  constructor() {
    super()
    this.todoArray = new ObservableArray<Todo>();
    this.doneArray = new ObservableArray<Todo>();
    this.updateArrayFromMemory();
  }

  private updateArrayFromMemory(){
    this.todoArray.splice(0);       // На всякий случай очищаем массив, так надо
    this.doneArray.splice(0);
    let keys = loadKeys();          // Получаем все ключи из памяти
    keys.forEach(key => {           // проходим циклом по каждому ключу
      let todo = <Todo>loadFromMem(key);  // Заргужаем объект по ключу
      if (todo.isDone){
        this.doneArray.push(todo);    // Вставляем в массив завершенных
      }
      else{
        this.todoArray.push(todo);    // Вставляем в массив текущих
      }
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
    view.showModal("add-root", options); // переходим на окно добавления
  }

  todoItemTap(args: ItemEventData){
    const item = args.index;              // Получаем индекс нажатого элемента
    const todo = <Todo>this.todoArray.getItem(item);    // Получаем соответсвующую индексу задачу
    const view: View = <View>args.object;
    const options = <ShowModalOptions>{
      animated: true,
      fullscreen: true,
      context: todo,
      closeCallback: () =>{this.updateArrayFromMemory();} // после закрытия окна обновляем массив задач
    };
    view.showModal("edit-root", options); // переходим на окно редактирования
  }

  doneItemTap(args: ItemEventData){
    const item = args.index;              // Получаем индекс нажатого элемента
    const todo = <Todo>this.doneArray.getItem(item);    // Получаем соответсвующую индексу задачу
    const view: View = <View>args.object;
    const options = <ShowModalOptions>{
      animated: true,
      fullscreen: true,
      context: todo,
      closeCallback: () =>{this.updateArrayFromMemory();} // после закрытия окна обновляем массив задач
    };
    view.showModal("edit-root", options); // переходим на окно редактирования
  }
}
