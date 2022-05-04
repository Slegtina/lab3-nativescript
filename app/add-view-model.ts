import { EventData, Observable, Page, TextField, View } from '@nativescript/core'
import { Todo, saveToMem} from './store'

export class AddModel extends Observable {

    private nameField: TextField;
    private decrField: TextField;

    constructor() {
      super()

    }

    loadedPage(args: EventData){ // при загрузке страницы получаем объекты текстовых полей
        const page = <Page>args.object;
        this.nameField = <TextField>page.getViewById("name");
        this.decrField = <TextField>page.getViewById("description");
    }

    save(args: EventData){
        const name = this.nameField.text;// получаем строки из текстовых полей
        const description = this.decrField.text;

        if (name !== ""){ // если поле name не пустое
            let todo = new Todo(name, description); // создаем новую задачу
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