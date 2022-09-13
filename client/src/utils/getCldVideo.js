import {Cloudinary} from "@cloudinary/url-gen";

// Import required actions and qualifiers.
export function getVideoTransformationsWithReactVideo() {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dheqfppu3', //use .env
    },
    url: {
      analytics: false
    }
  });

  // Use the video with public ID, 'docs/walking_talking'.
  const myVideo = cld.video('IMG_6437_kvhiic_g1ot5t');

  // Apply the transformation.
//   myVideo
//    .resize(fill().width(150).height(150).gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))))
//    .roundCorners(byRadius(20));    // Round the corners.
  return myVideo;
}