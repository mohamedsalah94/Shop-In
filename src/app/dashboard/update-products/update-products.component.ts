import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/Services/products.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss']
})
export class UpdateProductsComponent implements OnInit {

  addProductsForm: FormGroup;
  selectedFile: File = null;
  CurrentParam:any;
  ImageUrl:string;

  constructor(
    private _ProductsService: ProductsService,
    private _ToastyService:ToastyService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.ChangeNameoFInputFile();
    this.getCurrentParam();
    this.addProductForm(null,null,'bags',null,false,false,false,null,0);
  }

  getCurrentParam(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.CurrentParam = params.get('id')
      this.getProductsById(this.CurrentParam);
  })
  }

  addProductForm(Name,Describtion,Category,price,OnSale,OutOfStock,NewItem,ImageUrl,Discount){
    this.addProductsForm = new FormGroup({
      "Name": new FormControl(Name, [Validators.required]),
      "Describtion": new FormControl(Describtion, [Validators.required]),
      "Category": new FormControl(Category, [Validators.required]),
      "Price": new FormControl(price, [Validators.required]),
      "OnSale": new FormControl(OnSale, [Validators.required]),
      "OutOfStock": new FormControl(OutOfStock, [Validators.required]),
      "NewItem": new FormControl(NewItem, [Validators.required]),
      "ImageUrl": new FormControl(ImageUrl),
      "Discount": new FormControl( Discount , [Validators.required])
    });
  }

  updateProducts(data) {
    let formData: FormData;
    formData = new FormData();
    formData.append('file', this.selectedFile);
    if (data.Discount == 0) {
        data.OnSale = 'false';
    }
    if (data.OnSale == "false") {
      data.Discount = 0;
    }
    if (typeof(data.Discount) == "string") {
      data.Discount = Number(data.Discount);
    }
    data.Id = this.CurrentParam;
    this._ProductsService.UpdateProduct(data,formData).subscribe(()=>{
      this.router.navigate(['/dashboard']);
      this._ToastyService.success({title:'Upgrading Products',msg:'Item upgraded successfully',theme:'bootstrap',showClose:true,timeout:2000})
    },err=>{
      console.log(err.error)
      this._ToastyService.error({title:'Error while Upgrading item!',msg:err.error,theme:'bootstrap',showClose:true,timeout:2000})
    });
  }

  ChangeNameoFInputFile() {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;
      input.addEventListener('change', function (e) {
        console.log(e)
        var fileName = '';
        if (this.files && this.files.length > 1)
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else
          fileName = e.target.value.split('\\').pop();

        if (fileName)
          label.querySelector('span').innerHTML = fileName;
        else
          label.innerHTML = labelVal;
      });

      // Firefox bug fix
      input.addEventListener('focus', function () { input.classList.add('has-focus'); });
      input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
    });

    // change current image
    $('input[type="file"]').change(function (e) { 
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#ItemImage').attr('src', `${e.target.result}`);
      }
      reader.readAsDataURL(this.files[0]);
    });
  }

  onFileChange(file: FileList) {
    if (file.length > 0) {
      this.selectedFile = file.item(0);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onloadend = function () {
      };
    }
  }

  ItemDiscount(){
    $('#ItemDiscount').removeClass("d-none").addClass("d-block");
  }

  NoDiscount(){
    $('#ItemDiscount').removeClass("d-block").addClass("d-none");
  }

  getProductsById(id:number){
    this._ProductsService.getProductsById(id).subscribe(res=>{
      this.ImageUrl = res[0].imageUrl
      if (res[0].onSale == true) {
        this.ItemDiscount();
      }
      this.addProductForm(
        res[0].name,
        res[0].describtion,
        res[0].category,
        res[0].price,
        String(res[0].onSale),
        String(res[0].outOfStock),
        String(res[0].newItem),
        null,
        Number(res[0].discount)
        );
    })
  }

}

