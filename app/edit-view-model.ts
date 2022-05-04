import { EventData, Observable, Page, TextField, View, Switch } from '@nativescript/core'
import { Todo, saveToMem, removeFromMem} from './store'

export class EditModel extends Observable {
    private todo: Todo;
    private nameField: TextField;
    private decrField: TextField;
    private isDoneSwitch: Switch;

    constructor(context: Todo) {
      super()
      this.todo = context;
    }

    loadedPage(args: EventData){ // при загрузке страницы получаем объекты текстовых полей
        const page = <Page>args.object;
        this.nameField = <TextField>page.getViewById("name");
        this.decrField = <TextField>page.getViewById("description");
        this.isDoneSwitch = <Switch>page.getViewById("isDone");

        this.nameField.text = this.todo.name;
        this.decrField.text = this.todo.description;
        this.isDoneSwitch.checked = this.todo.isDone;
    }

    save(args: EventData){
        const name = this.nameField.text; // получаем строки из текстовых полей
        const description = this.decrField.text;
        const isDone = this.isDoneSwitch.checked;
        
        this.todo.name = name;
        this.todo.description = description;
        this.todo.isDone = isDone;

        saveToMem(this.todo);    // сохраняем ее
        
        const view = <View>args.object; 
        view.closeModal(); // выходим
    }

    cancel(args: EventData){
        const view = <View>args.object;
        view.closeModal(); // выходим
    }

    delete(args: EventData){
        removeFromMem(this.todo.id);
        const view = <View>args.object;
        view.closeModal(); // выходим
    }
}