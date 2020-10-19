import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltermenuComponent } from './filtermenu.component';

describe('FiltermenuComponent', () => {
  let component: FiltermenuComponent;
  let fixture: ComponentFixture<FiltermenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltermenuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
