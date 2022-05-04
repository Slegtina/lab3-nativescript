import { EventData, Observable, Page, TextField, View } from '@nativescript/core'
import { Todo, saveToMem} from './store'

export class AddModel extends Observable {

    private idField: TextField;
    private nameField: TextField;
    private decrField: TextField;

    constructor() {
      super()

    }

    loadedPage(args: EventData){ // при загрузке страницы получаем объекты текстовых полей
        const page = <Page>args.object;
        this.idField = <TextField>page.getViewById("id");
        this.nameField = <TextField>page.getViewById("name");
        this.decrField = <TextField>page.getViewById("description");
    }

    save(args: EventData){
        const id = this.idField.text; // получаем строки из текстовых полей
        const name = this.nameField.text;
        const description = this.decrField.text;

        if (id !== "" && name !== ""){ // если поля id и name не пустые
            let todo = new Todo(id, name, description); // создаем новую задачу
            saveToMem(todo);    // сохраняем ее
        }
        
        const view = <View>args.object; 
        view.closeModal(); // выходим
    }

    cancel(args: EventData){
        const view = <View>args.object;
        view.closeModal(); // выходим
    }
}