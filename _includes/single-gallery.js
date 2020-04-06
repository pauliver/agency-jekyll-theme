{% include jquery.justified.js %}

// var JsonString = ` include gallery.json `;
// var Gallery =  JSON.parse( JsonString );

var GalleryObject = {% include gallery.json %};
var Iterator = GalleryObject;
var target_string_gallery = "none";
var domain_name = "{{ site.url }}/";

function ForEachImageOnce(item,index)
{
	item.ResizedFilePath = domain_name.concat(item.ResizedFilePath); 	
	item.ThumbnailFilePath = domain_name.concat(item.ThumbnailFilePath);
}

function ForEachGalleryOnce(item, index)
{
	if(item.PhotoGalleries != null)//array of above
	{
		item.PhotoGalleries.forEach(ForEachGalleryOnce);
	}
	if(item.Images != null)
	{
		item.Images.forEach(ForEachImageOnce);		
	}
	
	var galleryname = '.image-container-'.concat(item.GalleryName);
	
	if(galleryname == target_string_gallery)
	{
		$( galleryname ).empty().justifiedImages({
		    images : item.Images,
		    rowHeight: 150,
		    maxRowHeight: 300,
		    thumbnailPath: function(photo, width, height){
			if(width < 512 && height < 512)
			{
				return photo.ThumbnailFilePath;
			}else{ //(width >=512 && height >= 512)
				return photo.ResizedFilePath;
			}
			return photo.ThumbnailFilePath;
		    },
		    getSize: function(photo){
			return {width: photo.ImageWidth, height: photo.ImageHeight};
		    },
		    margin: 1
		});
	}
	
}

function SetupGallery(string_gallery)
{
	if(string_gallery.endsWith("ImgContainer"))
	{
		target_string_gallery = string_gallery.replace("ImgContainer","").trim();
	}else{
		target_string_gallery = string_gallery;
	}
	Iterator.PhotoGalleries.forEach(ForEachGalleryOnce);
}
