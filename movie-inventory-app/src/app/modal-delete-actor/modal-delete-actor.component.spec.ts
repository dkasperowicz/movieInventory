import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteActorComponent } from './modal-delete-actor.component';

describe('ModalDeleteActorComponent', () => {
  let component: ModalDeleteActorComponent;
  let fixture: ComponentFixture<ModalDeleteActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
