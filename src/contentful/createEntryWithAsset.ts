import { Property } from "types/interfaces/property";
import { createClient } from "contentful-management";

const client = createClient({
    accessToken: process.env.NEXT_CONTENTFUL_PERSONAL_ACCESS_TOKEN as string,
  });
  

var faker = require("faker");
var _ = require("lodash");

export async function createEntryWithAsset(
    data: Omit<Property, "id">,
    uploadHref: string
  ) {
    // #1 Get Space
    const space = await client.getSpace(process.env.NEXT_CONTENTFUL_SPACE_ID);
    // #2 Get Environment
    const environment = await space.getEnvironment("master");

    console.log("data.lng in postProperty() : ", data.longitude);
    // #3 Create Entry
    let entry = await environment.createEntry("propertyListings", {
      fields: {
        id: {
          "en-US": faker.datatype.number(999999).toString(),
        },
        firstName: {
            "en-US": data.firstName,
        },
        lastName: {
            "en-US": data.lastName,
        },
        email: {
            "en-US": data.email,
        },
        phone: {
            "en-US": data.phone,
        },
        price: {
            "en-US": data.price,
        },
        address: {
            "en-US": data.address,
        },
        image: {
          "en-US": null,
        },
        latitude: {
          "en-US": Number(data.latitude as number),
        },
        longitude: {
          "en-US": Number(data.longitude as number),
        },
        bedrooms: {
          "en-US": data.bedrooms,
        },
        bathrooms: {
          "en-US": data.bathrooms,
        },
        sqft: {
          "en-US": Number(data.sqft),
        },
        carSpaces: {
          "en-US": data.carSpaces,
        },
        type: {
          "en-US": data.type,
        },
        status: {
            "en-US": data.status
        },
        datePosted: {
          "en-US": data.datePosted,
        },
        petFriendly: {
          "en-US": data.petFriendly,
        },
      },
    });
    // #4 Reassign Entry to have latest version
    entry = await entry.publish();
    // #5 Asset Creation
    let asset = await environment.createAsset({
      fields: {
        title: {
          "en-US": "image",
        },
        file: {
          "en-US": {
            contentType: "image/jpeg",
            fileName: faker.datatype.number(999999999) + ".jpg",
            upload: uploadHref,
          },
        },
      },
    });
    // #6 Asset Publish
    asset = await asset.processForAllLocales();
    asset = await asset.publish();

    // //#7 Update Entry With New Asset
    entry.fields["image"]["en-US"] = {
      sys: {
        id: asset.sys.id,
        linkType: "Asset",
        type: "Link",
      },
    };
    entry = await entry.update();
    entry = await entry.publish();
  }