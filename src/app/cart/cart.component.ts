import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './cart.component.css'
  ]
})
export class CartComponent {


  cart: any = null
  cartEmpty = true
  totalPrice = 0

  ngOnInit() {
    if(localStorage.getItem('cart')){
        this.cart = JSON.parse(localStorage.getItem('cart') || '')
    }
    if(this.cart != null){
      if(this.cart.length != 0){
        this.cartEmpty = false
      }
      else{
        this.cartEmpty = true
      }
    }
    else {
      this.cartEmpty = true
    }
    this.calculateTotalPrice()
  }

  calculateTotalPrice() {
    if(this.cart != null){
      this.cart.forEach(element => {
        this.totalPrice += element.quantity * parseInt(element.specifications.price.replace('$',''))
      });
    }
  }

  reduceQuantity(id){
    this.cart.map((element,index) => {
      if(element.id == id){
        element.quantity -= 1
        if(element.quantity == 0){
          this.cart.splice(index,1)
        }
        element.totalPrice -= parseInt(element.specifications.price.replace('$',''))
        this.totalPrice -= parseInt(element.specifications.price.replace('$','')) 
        return element
      }
    })
    if(this.cart.length == 0){
      this.cartEmpty = true
    }
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }

  increaseQuantity(id){
    this.cart.map(element => {
      if(element.id == id){
        element.quantity += 1
        element.totalPrice += parseInt(element.specifications.price.replace('$','')) 
        this.totalPrice += parseInt(element.specifications.price.replace('$','')) 
        return element
      }
    })
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }

}
