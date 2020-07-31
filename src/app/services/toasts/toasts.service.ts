import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  toastsMessageData = new BehaviorSubject<{
    title: string;
    message: string;
    type: string
  }>(null);



  constructor() { }

  show(
      code: number,
      message: string
  ) {
    const obj = {
      title: 'Success!',
      message: message,
      type: 'success'
      }
      
      if (code >=400) {
      obj.title = 'Error!';
      obj.type = 'error'
      }
      
    this.toastsMessageData.next(obj);

    setTimeout(() => this.toastsMessageData.next(null), 2000);
  }
}


