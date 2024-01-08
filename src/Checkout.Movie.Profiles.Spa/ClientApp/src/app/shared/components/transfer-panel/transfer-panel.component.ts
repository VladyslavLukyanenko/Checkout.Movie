import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { MatSelectionList } from "@angular/material/list";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {filter, map, takeUntil} from "rxjs/operators";

@Component({
  selector: "pst-transfer-panel",
  templateUrl: "./transfer-panel.component.html",
  styleUrls: ["./transfer-panel.component.scss"]
})
export class TransferPanelComponent implements OnInit, OnChanges, OnDestroy {
  private sourceStream: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private preparedSourceStream: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private selectedStream: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private preparedSelectedStream: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private sourceSearchTermStream: BehaviorSubject<string> = new BehaviorSubject("");
  private selectedSearchTermStream: BehaviorSubject<string> = new BehaviorSubject("");
  private destroy$: Subject<void> = new Subject();

  @Input()
  get source(): any[] {
    return this.sourceStream.getValue();
  }

  set source(value: any[]) {
    this.sourceStream.next(value);
  }

  @Input()
  get selected(): any[] {
    return this.selectedStream.getValue();
  }

  set selected(value: any[]) {
    this.selectedStream.next(value);
  }

  @Input()
  sourceListLabel: string;

  @Input()
  selectedListLabel: string;

  @Input()
  displayValueAccessor: (q: any) => string;

  @Input()
  comparer: (left: any, right: any) => boolean;

  @Input()
  itemTemplate: TemplateRef<any>;

  @Output()
  addToSelected: EventEmitter<any[]> = new EventEmitter();

  @Output()
  removeFromSelected: EventEmitter<any[]> = new EventEmitter();

  activeSelected: any[] = [];
  activeSource: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  get preparedSourceStream$(): Observable<any[]> {
    return this.preparedSourceStream.asObservable();
  }

  get preparedSelectedStream$(): Observable<any[]> {
    return this.preparedSelectedStream.asObservable();
  }

  get selectedSearchTerm(): string {
    return this.selectedSearchTermStream.getValue();
  }

  set selectedSearchTerm(value: string) {
    this.selectedSearchTermStream.next(value);
  }


  get sourceSearchTerm(): string {
    return this.sourceSearchTermStream.getValue();
  }

  set sourceSearchTerm(value: string) {
    this.sourceSearchTermStream.next(value);
  }

  ngOnInit() {
    combineLatest(this.selectedSearchTermStream.asObservable(), this.selectedStream)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([searchTerm]) => {
        searchTerm = searchTerm.toLowerCase();
        const items = this.filterItems(searchTerm, this.selected);
        this.preparedSelectedStream.next(items);
      });

    combineLatest(this.sourceSearchTermStream.asObservable(), this.sourceStream)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([searchTerm]) => {
        searchTerm = searchTerm.toLowerCase();
        const items = this.filterItems(searchTerm, this.source);
        this.preparedSourceStream.next(items);
      });
  }

  isSelected(item: any) {
    return this.selected.some(s => this.comparer(item, s));
  }

  private filterItems(searchTerm: string, items: any[]) {
    return items.filter(item => this.displayValueAccessor(item).toLowerCase().indexOf(searchTerm) !== -1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected && changes.selected.currentValue) {
      this.selectedStream.next(this.selected);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addActiveSourceToSelected() {
    this.addToSelected.emit(this.activeSource);
    this.activeSource = [];
  }

  removeActiveSelectedFromSelected() {
    this.removeFromSelected.emit(this.activeSelected);
    this.activeSelected = [];
  }

  toggleActiveSource(item: any) {
    this.toggleItemInArray(item, this.activeSource);
  }

  toggleActiveSelected(item: any) {
    this.toggleItemInArray(item, this.activeSelected);
  }

  toggleItemInArray(item: any, array: any[]) {
    const idx = array.indexOf(item);
    if (idx !== -1) {
      array.splice(idx, 1);
    } else {
      array.push(item);
    }

    this.changeDetector.detectChanges();
  }
}
