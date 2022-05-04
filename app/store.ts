// Здесь описан класс Todo, и функции для сохранения(загрузки) объектов Todo в память в виде строки

import {getString, setString, hasKey, getAllKeys, remove} from '@nativescript/core/application-settings';

export class Todo {
    id: string;
    name: string;
    description: string;
    isDone: boolean;

    constructor(name: string, descr: string){
        this.id = uuid();
        this.name = name;
        this.description = descr;
        this.isDone = false;
    }
}

function uuid(): string { // типа uuid генератор
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export function saveToMem(todo: Todo): void{
    let dump = JSON.stringify(todo);    // преобразуем объект в строку
    setString(todo.id, dump);           // сохраняем строку в память с ключем равным его id
}

export function loadFromMem(id: string): Todo{
    if (hasKey(id)){                // проверяем что такой id есть в памяти
        let dump = getString(id);   // получаем из памяти строку по id
        return JSON.parse(dump);    // преобразуем строку в объект и возвращаем
    }
}

export function removeFromMem(id): void{ // удаляем ключ из памяти
    if (hasKey(id)){ 
        return remove(id);
    }
}

export function loadKeys(): Array<string>{ // возвращаем все ключи
    return getAllKeys();
}