import { Component, OnInit, Input } from '@angular/core';
import { GalleryItem, ImageItem, Gallery, GalleryRef } from 'ng-gallery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.css'],
})
export class GalleryImagesComponent implements OnInit {
  @Input() imagesCategory : any []; 
  images: GalleryItem[] = [];
  URLAPI = environment.urlApi;
  
  galleryId = 'foodGallery';


  constructor(private gallery: Gallery) { 

  }

  ngOnInit() {

    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
    this.imagesCategory?.forEach(image => {
      //this.images.push(new ImageItem({src: this.URLAPI+image.urlImage, thumb: this.URLAPI+image.urlImage}));
      if (image.urlImage != ''){
        galleryRef.addImage({
          src: this.URLAPI+image.urlImage,
          thumb: this.URLAPI+image.urlImage,
          title: image.title
        });
      }
    })

  }

}
