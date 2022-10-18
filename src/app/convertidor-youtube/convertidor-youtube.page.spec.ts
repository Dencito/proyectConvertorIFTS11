import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConvertidorYoutubePage } from './convertidor-youtube.page';

describe('ConvertidorYoutubePage', () => {
  let component: ConvertidorYoutubePage;
  let fixture: ComponentFixture<ConvertidorYoutubePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertidorYoutubePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConvertidorYoutubePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
