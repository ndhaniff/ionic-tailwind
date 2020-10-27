import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MypurchasePage } from './mypurchase.page';

describe('MypurchasePage', () => {
  let component: MypurchasePage;
  let fixture: ComponentFixture<MypurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypurchasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MypurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
