// Здесь описан класс Todo, и функции для сохранения(загрузки) объектов Todo в память в виде строки

import {getString, setString, hasKey, getAllKeys, remove} from '@nativescript/core/application-settings';

export class Todo {
    id: string;
    name: string;
    description: string;
    isDone: boolean;

    constructor(id: string, name: string, descr: string){
        this.id = id;
        this.name = name;
        this.description = descr;
        this.isDone = false;
    }
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