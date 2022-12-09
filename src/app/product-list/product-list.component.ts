import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.css'
  ]
})
export class ProductListComponent {
  products = [
    {
      id: 1,
      name: "iPhone 12",
      specifications: {
        color: "black",
        weight: "250g",
        storage: "256GB",
        price: "1000$"
      },
      picture: "assets/iphone12.jpg"
    },
    {
      id: 2,
      name: "Airpods",
      specifications: {
        color: "white",
        weight: "50g",
        storage: "N/A",
        price: "200$"
      },
      picture: "assets/airpods.jpg"
    },
    {
      id: 3,
      name: "Samsung S22",
      specifications: {
        color: "black",
        weight: "250g",
        storage: "512GB",
        price: "900$"
      },
      picture: "assets/samsung-s22.jpg"
    },
    {
      id: 4,
      name: "Samsung Note10",
      specifications: {
        color: "black",
        weight: "250g",
        storage: "256GB",
        price: "950$"
      },
      picture: "assets/samsung-note10.jpg"
    },
    {
      id: 5,
      name: "iPhone 14",
      specifications: {
        color: "grey",
        weight: "250g",
        storage: "256GB",
        price: "1300$"
      },
      picture: "assets/iphone14.jpg"
    }
  ];

  cart: any = [];
  
  @Output() buttonOveredEvent = new EventEmitter<boolean>();


  addToCard(product){
    if(localStorage.getItem('cart') != null){
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '')
      if(cartFromLocalStorage != ''){
        this.cart = cartFromLocalStorage
      }
    }
    if(this.isProductAlreadyInCart(product)){
      const productToUpdate = this.cart.find((element => element.id == product.id))
      productToUpdate.quantity += 1
      productToUpdate.totalPrice = productToUpdate.quantity * parseInt(productToUpdate.specifications.price.replace('$',''))  

      this.cart.map(element => {
        if(element.id == productToUpdate.id){
          return productToUpdate
        }
      })
    }
    else{
      product.quantity = 1
      product.totalPrice = parseInt(product.specifications.price.replace('$','')) 
      this.cart.push(product)
    }
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }

  isProductAlreadyInCart(product){
    return this.cart.find((element => element.id == product.id)) == undefined ? false : true
  }

  buttonOvered(value: boolean) {
    this.buttonOveredEvent.emit(value);
  }
}
