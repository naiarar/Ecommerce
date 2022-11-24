import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class NotificacaoService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  notificar(mensagem: string) {
    console.log(this.snackBar, mensagem)
    this.snackBar.open(mensagem,)
    // this.snackBar.open(mensagem, "Ok", {
    //   duration: 2000,
    //   verticalPosition: "top",
    //   horizontalPosition: "center"
    // });
  }
}
