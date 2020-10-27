import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyshopPage } from './myshop.page';

describe('MyshopPage', () => {
  let component: MyshopPage;
  let fixture: ComponentFixture<MyshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyshopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
