import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewarrivalsPage } from './newarrivals.page';

describe('NewarrivalsPage', () => {
  let component: NewarrivalsPage;
  let fixture: ComponentFixture<NewarrivalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewarrivalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewarrivalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
