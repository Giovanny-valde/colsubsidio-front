import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CuentaService } from '../services/cuenta.service';
import { Cuenta } from '../models/cuenta.model';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { MovimientoService } from '../services/movimiento.service';
import { TipoMovimientoService } from '../services/tipo-movimiento.service';
import { TipoMovimiento } from '../models/tipo-movimiento.model';
import { Movimiento } from '../models/movimiento.model';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  titulo : string = ""
  cuentas : Cuenta[] = [];
  clientes : Cliente[] = []
  cuenta! : Cuenta
  tipoMovimientos : TipoMovimiento[] = [];

  cuentasForm! : FormGroup;
  movimientoForm!: FormGroup;

  constructor(
    private cuentaService : CuentaService,
    private cliente : ClienteService,
    private movimientoService : MovimientoService,
    private tipoMovimientoService : TipoMovimientoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.buildCuentasForm()

    this.buildMovimientoForm()

    this.cliente.getClientes().subscribe((data) =>{
      this.clientes = data;
    })

    this.tipoMovimientoService.getTiposMovimiento().subscribe((data) =>{
      this.tipoMovimientos = data;
    })

    this.getCuentas()

  }

  buildCuentasForm(){
    this.cuentasForm = this.formBuilder.group({
      id: [],
      numero: ['', Validators.required],
      saldo: ['', Validators.required],
      cliente: ['', Validators.required]
    });
  }

  buildMovimientoForm(){
    this.movimientoForm = this.formBuilder.group({
      id: [],
      fecha: [new Date()],
      valor: ['', Validators.required],
      tipoMovimiento: ['', Validators.required],
      cuenta: ['']
    });
  }

  getCuentas(){
    this.cuentaService.getCuentas().subscribe((data) =>{
      this.cuentas = data;
    })

  }

  editar(cuenta : Cuenta){
    this.cuentasForm.setValue(cuenta);
  }

  onSubmit() {

    let cliente = {
      id : this.cuentasForm.controls["cliente"].value
    }

    this.cuentasForm.controls["cliente"].setValue( cliente )

    const cuenta: Cuenta = this.cuentasForm.value;

    if(cuenta.id == null){
      this.cuentaService.crearCuenta(cuenta).subscribe((data) =>{
        this.getCuentas()
      })
    }else{
      this.cuentaService.actualizarCuenta(cuenta).subscribe((data) =>{
        this.getCuentas()
      })
    }
  }

  onSubmitMovimiento(){

    if( 
    (this.movimientoForm.controls["valor"].value > this.cuenta.saldo) &&
    (this.movimientoForm.controls["tipoMovimiento"].value == '1')
    ){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error en el formulario, no tienes saldo suficiente",
        showConfirmButton: false,
        timer: 1500
      });
      return 
    }

    this.movimientoForm.controls["cuenta"].setValue(this.cuenta)
  
    let tipo : TipoMovimiento = {
      id : this.movimientoForm.controls["tipoMovimiento"].value ,
      tipo : ""
    }
    this.movimientoForm.controls["tipoMovimiento"].setValue( tipo )
    
    const movimiento : Movimiento = this.movimientoForm.value;

    this.movimientoService.crearMovimiento(movimiento).subscribe( (data)=>{
      this.getCuentas()
    })
  }

  eliminar(id : any){
    Swal.fire({
      title: "Estas seguro de eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentaService.eliminarCuenta(id).subscribe((data) =>{
          Swal.fire({
            title: "Eliminado!",
            icon: "success"
          });
          this.getCuentas()
        })

      }
    });
  }

}
