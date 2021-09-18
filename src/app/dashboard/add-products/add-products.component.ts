import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ToastyService } from 'ng2-toasty';



declare var $: any;
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  addProductsForm: FormGroup;
  isSuperAdmin: boolean = false;
  selectedFile: File = null;
  selectedFile2: string;

  constructor(
    private _AuthService: AuthService,
    private _ProductsService: ProductsService,
    private _ToastyService:ToastyService
    // private router:Router
  ) { }

  ngOnInit(): void {
    this.CheckAuth();
    this.ChangeNameoFInputFile()

    this.addProductsForm = new FormGroup({
      "Name": new FormControl(null, [Validators.required]),
      "Describtion": new FormControl(null, [Validators.required]),
      "Category": new FormControl("bags", [Validators.required]),
      "Price": new FormControl(null, [Validators.required]),
      "OnSale": new FormControl('false', [Validators.required]),
      "OutOfStock": new FormControl('false', [Validators.required]),
      "NewItem": new FormControl('false', [Validators.required]),
      "ImageUrl": new FormControl(null, [Validators.required]),
      "Discount": new FormControl( 0 , [Validators.required])
    });
  }

  addProducts(data) {
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
    this._ProductsService.AddProduct(data,formData).subscribe(()=>{
      this.addProductsForm.get("Name").reset();
      this.addProductsForm.get("Describtion").reset();
      this.addProductsForm.get("Price").reset();
      this.addProductsForm.get("ImageUrl").reset();
      $("#upload-file").text("Choose a file");
    },err=>{
      // console.log(err.error)
      this._ToastyService.error({title:'Error while adding item!',msg:err.error,theme:'bootstrap',showClose:true,timeout:2000})
    },()=>{
      this._ToastyService.success({title:'Adding Products',msg:'Item Added successfully',theme:'bootstrap',showClose:true,timeout:2000})
    });
  }

  CheckAuth() {
    this._AuthService.currentUser.subscribe((data) => {
      if (data == null) {
        this.isSuperAdmin = false;
      }
      else {
        if (data[2][1] == "SuperAdmin" || data[2][2] == "SuperAdmin") {
          this.isSuperAdmin = true;
        }
        else {
          this.isSuperAdmin = false;
        }
      }
    })
  }

  ChangeNameoFInputFile() {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;
      input.addEventListener('change', function (e) {
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

}
