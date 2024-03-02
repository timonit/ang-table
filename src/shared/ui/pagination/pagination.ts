import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination implements OnChanges {
  @Input() hasPrevButton?: boolean = false;

  @Input() hasNextButton?: boolean = false;

  @Input() pageCount?: number;

  @Input({ required: true }) page!: number;

  @Output('changePage') changePage = new EventEmitter<number>();

  dispatchChangePage(page: number) {
    if (this.changePage) this.changePage.emit(page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }
}
