import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { Cuenta } from '../models/cuenta.model';
import { CuentaService } from '../services/cuenta.service';
import { Movimiento } from '../models/movimiento.model';
import { MovimientoService } from '../services/movimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reporte } from '../models/reporte';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  clientes : Cliente[] = []
  cuentas : Cuenta[] = [];
  reportes : Reporte[] = []
   
  reporteForm! : FormGroup;


  constructor(
    private clienteService : ClienteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.reporteForm = this.formBuilder.group({
      id: [],
      fechaInicial: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });

    this.clienteService.getClientes().subscribe((data) =>{
      this.clientes = data;
    })
  }

  onSubmit(){

    console.log(this.reporteForm.value);

    this.clienteService.reporteMovimiento(this.reporteForm.value).subscribe((data) =>{
      this.reportes = data
    })

  }


  
}
