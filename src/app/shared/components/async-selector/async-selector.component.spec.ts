import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncSelectorComponent } from './async-selector.component';

describe('AsyncSelectorComponent', () => {
  let component: AsyncSelectorComponent;
  let fixture: ComponentFixture<AsyncSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
