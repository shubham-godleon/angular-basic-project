import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  pageTitle: string = 'Product Detail';
  id: Number = 0;
  products: IProduct[] = [];
  imageWidth: number = 150;
  imageMargin: number = 8;
  sub!: Subscription;
  errorMessage: string= ' ';
  displayProduct: IProduct[] | undefined;
  
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.pageTitle += `: ${id}`;
    this.id = Number(`${id}`);
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.displayProduct = this.products.filter((product: IProduct) => 
            product.productId === this.id);
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
