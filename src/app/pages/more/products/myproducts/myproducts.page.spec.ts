import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyproductsPage } from './myproducts.page';

describe('MyproductsPage', () => {
  let component: MyproductsPage;
  let fixture: ComponentFixture<MyproductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyproductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyproductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
