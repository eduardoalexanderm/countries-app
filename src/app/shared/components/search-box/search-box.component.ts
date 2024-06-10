import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Input() placeholder: string = '';
  // de rxjs 6.5.5 en adelante, se debe usar Subject en lugar de BehaviorSubject
  private debouncer: Subject<string> = new Subject<string>();

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe((value: string) => {
        this.onDebounce.emit(value);
      });
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  // nota de explicación: el método onValue() no se usa en este componente,
  //  pero se deja como ejemplo de cómo se puede emitir un valor sin debounce
  // y cómo se puede usar en el componente padre
  // el ngOnInit() se deja como ejemplo de cómo se puede usar el debouncer
  // para emitir un valor con debounce y cómo se puede usar en el componente padre

}
