import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { VerifyDataComponent } from './verify-data.component';
import { VerifyDataService } from '../../../services/verifyData/verify-data.service';
import { HttpClientModule } from '@angular/common/http';
import { UPLOAD_IMPORTS } from './ImportsModule';

describe('VerifyDataComponent', () => {
  let component: VerifyDataComponent;
  let fixture: ComponentFixture<VerifyDataComponent>;
  let mockVerifyDataService: jasmine.SpyObj<VerifyDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('VerifyDataService', [
      'getRelationsVerifyData', 
      'updateVerifyData', 
      'deleteVerifyData'
    ]);

    await TestBed.configureTestingModule({
      imports: [VerifyDataComponent, ...UPLOAD_IMPORTS, HttpClientModule],
      providers: [{ provide: VerifyDataService, useValue: spy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDataComponent);
    component = fixture.componentInstance;
    mockVerifyDataService = TestBed.inject(VerifyDataService) as jasmine.SpyObj<VerifyDataService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    const mockData = [{
      _id: '1',
      identification: '123456',
      name: 'John Doe',
      gender: 'Male',
      province: 'SomeProvince',
      commandType: 'CourseType',
      state: 'Active'
    }];

    mockVerifyDataService.getRelationsVerifyData.and.returnValue(of(mockData));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.data.length).toBe(1);
    expect(component.filteredData.length).toBe(1);
  });

  it('should handle fetch data error', () => {
    mockVerifyDataService.getRelationsVerifyData.and.returnValue(throwError('Error'));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.data.length).toBe(0);
    expect(component.filteredData.length).toBe(0);
  });

  it('should filter data', () => {
    component.data = [{
      id: '1',
      cedula: '123456',
      nombresCompletos: 'John Doe',
      genero: 'Male',
      provincia: 'SomeProvince',
      tipoCurso: 'CourseType',
      estado: 'Active'
    }];
    component.searchTerm = 'John';
    component.filterData();
    expect(component.filteredData.length).toBe(1);

    component.searchTerm = 'NonExisting';
    component.filterData();
    expect(component.filteredData.length).toBe(0);
  });

  it('should update data on accept', async () => {
    const mockSwalResult: SweetAlertResult = {
      isDenied: false, isDismissed: false,
      isConfirmed: false
    };
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(mockSwalResult));
    mockVerifyDataService.updateVerifyData.and.returnValue(of({}));
    
    const rowData = { id: '1', cedula: '123456', nombresCompletos: 'John Doe', genero: 'Male', provincia: 'SomeProvince', tipoCurso: 'CourseType', estado: 'Active' };
    spyOn(component, 'updateTable');

    await component.aceptar(rowData);
    fixture.detectChanges();

    expect(mockVerifyDataService.updateVerifyData).toHaveBeenCalledWith('1', { updated_at: jasmine.any(Date) });
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should handle update data error on accept', async () => {
    const mockSwalResult: SweetAlertResult = { isConfirmed: true, isDenied: false, isDismissed: false };
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(mockSwalResult));
    mockVerifyDataService.updateVerifyData.and.returnValue(throwError('Error'));

    const rowData = { id: '1', cedula: '123456', nombresCompletos: 'John Doe', genero: 'Male', provincia: 'SomeProvince', tipoCurso: 'CourseType', estado: 'Active' };
    await component.aceptar(rowData);
    fixture.detectChanges();

    expect(mockVerifyDataService.updateVerifyData).toHaveBeenCalledWith('1', { updated_at: jasmine.any(Date) });
  });

  it('should delete data on reject', async () => {
    const mockSwalResult: SweetAlertResult = { isConfirmed: true, isDenied: false, isDismissed: false };
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(mockSwalResult));
    mockVerifyDataService.deleteVerifyData.and.returnValue(of({}));
    
    const rowData = { id: '1', cedula: '123456', nombresCompletos: 'John Doe', genero: 'Male', provincia: 'SomeProvince', tipoCurso: 'CourseType', estado: 'Active' };
    spyOn(component, 'updateTable');

    await component.rechazar(rowData);
    fixture.detectChanges();

    expect(mockVerifyDataService.deleteVerifyData).toHaveBeenCalledWith('1');
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should handle delete data error on reject', async () => {
    const mockSwalResult: SweetAlertResult = { isConfirmed: true, isDenied: false, isDismissed: false };
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(mockSwalResult));
    mockVerifyDataService.deleteVerifyData.and.returnValue(throwError('Error'));

    const rowData = { id: '1', cedula: '123456', nombresCompletos: 'John Doe', genero: 'Male', provincia: 'SomeProvince', tipoCurso: 'CourseType', estado: 'Active' };
    await component.rechazar(rowData);
    fixture.detectChanges();

    expect(mockVerifyDataService.deleteVerifyData).toHaveBeenCalledWith('1');
  });

  it('should update table', () => {
    spyOn(component, 'fetchData').and.callThrough();
    spyOn(component, 'filterData').and.callThrough();
    
    component.updateTable();
    fixture.detectChanges();

    expect(component.fetchData).toHaveBeenCalled();
    expect(component.filterData).toHaveBeenCalled();
  });

  it('should handle global filter', () => {
    const mockEvent = { target: { value: 'Test' } } as any;
    component.filterGlobal(mockEvent);
    expect(component.searchTerm).toBe('Test');
  });

});
