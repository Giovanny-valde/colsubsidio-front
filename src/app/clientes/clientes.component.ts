import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  titulo : string = ""
  clientes : Cliente[] = []
  clienteForm!: FormGroup;

  constructor(
    private cliente : ClienteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.buildClienteForm()
    this.getClientes()
    
  }

  buildClienteForm(){
    this.clienteForm = this.formBuilder.group({
      id: [],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  getClientes(){
    this.cliente.getClientes().subscribe((data) =>{
      this.clientes = data;
    })
  }

  editar(cliente : Cliente){
    this.clienteForm.setValue(cliente);
  }

  onSubmit() {

    const cliente: Cliente = this.clienteForm.value;

    if(cliente.id == null){
      this.cliente.crearCliente(cliente).subscribe((data) =>{
        this.getClientes()
      })
    }else{
      this.cliente.actualizarCliente(cliente).subscribe((data) =>{
        this.getClientes()
      })
    }

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
        this.cliente.eliminarCliente(id).subscribe((data) =>{
          Swal.fire({
            title: "Eliminado!",
            icon: "success"
          });
          this.getClientes()
        })

      }
    });
  }


  

}
