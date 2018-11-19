import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() statusList: Array<number>;
  @Output() navigate = new EventEmitter();



  eventsDescription = {
    "1": "QR код не был распознан.",
    "2": "Картинка содержит больше одного QR-кода.",
    "3": "Не верный формат в QR-коде.",
    "4": "Чек не найден в налоговой",
    "5": "В чеке нет продукции SPLAT",
    "6": "Не удалось открыть файл",
    "7": "Товар приобретен не во время проведения акции",
    "8": "Неверная сеть магазинов."
  };

  constructor() { }

  updateRoute(status) {
    console.log(status)
    this.navigate.emit(status)
  }

  ngOnInit() {
  }

}
