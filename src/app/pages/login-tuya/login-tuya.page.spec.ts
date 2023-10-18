import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginTuyaPage } from './login-tuya.page';

describe('LoginTuyaPage', () => {
  let component: LoginTuyaPage;
  let fixture: ComponentFixture<LoginTuyaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginTuyaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
