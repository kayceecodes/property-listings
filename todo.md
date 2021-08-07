## To do
    X Add modal
    X Make sure state is set before posting to contentful
    Fix changeColor()
    XPost Property
    Figure out access to post property
    Override textfield in createMui()
    Break the createEntry call to make sure things works as should when it's fixed

## You have to use environment.getEntry(EntryIDHere) and 
##  then convert the return into an object using .toPlainObject(); and 
##  then append your new data to the local object.
##  Then you can execute the code above to update the object in contentful with the json characteristics of ##  the local object.
    /* make entry */

    /* then statement - Post Request for entered image, createAsset() */
    const asset = createAsset()

    /* get the entry using an ID */
    const entry = environment.getEntry(<entryId>)

    /* convert return of getEntry to an object */
    const entryObject = toPlainObject(entry)

    /* append data to local object */
     entryObject.append(assetImage)


    // // //

    make asset

    make entry

    return entry

    then update with entry.fields['images']

    

    // // //

    const postProperty = (data: PostProperty) => {
    const contentful = require('contentful-management')

    const client = contentful.createClient({
      accessToken: process.env.NEXT_CONTENTFUL_PERSONAL_ACCESS_TOKEN as string,
    })
    client
      .getSpace(process.env.NEXT_CONTENTFUL_SPACE_ID as string)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        var fileData = {
          fields: {
            title: {
              'en-US': data.streetAddress + '-' + data.state,
            },
            file: {
              'en-US': {
                contentType: 'image/jpeg',
                fileName: data.streetAddress + '-' + data.state + '.jpg',
                upload: fileValue,
              },
            },
          },
        }
        const asset = environment.createAsset(fileData).then((asset) => {
          asset.processForAllLocales().then(function (processedAsset) {
            processedAsset.publish().then(function (publishedAsset) {
              console.log(publishedAsset)
            })
          })
          return asset
        })
        // const entry = environment.getEntry('master').toPlainObject()

        // entry.append()

        // var fileData = {
        //   fields: {
        //     title: {
        //       'en-US': data.streetAddress + '-' + data.state,
        //     },
        //     file: {
        //       'en-US': {
        //         contentType: 'image/jpeg',
        //         fileName: data.streetAddress + '-' + data.state + '.jpg',
        //         upload: fileValue,
        //       },
        //     },
        //   },
        // }
        // environment.createAsset(fileData).then((asset) => {
        //   asset.processForAllLocales().then(function (processedAsset) {
        //     processedAsset.publish().then(function (publishedAsset) {
        //       console.log(publishedAsset)
        //     })
        //   })
        // })
        return environment.createEntry('propertyListings', {
          fields: {
            id: {
              'en-US': faker.datatype.string(6) + '-' + data.streetAddress,
            },
            streetAddress: {
              'en-US': data.streetAddress,
            },
            city: {
              'en-US': data.city,
            },
            state: {
              'en-US': data.state,
            },
            zipcode: {
              'en-US': data.zipcode,
            },
            latitude: {
              'en-US': data.latitude,
            },
            longitude: {
              'en-US': data.longitude,
            },
            price: {
              'en-US': data.price,
            },
            // images: {
            //   'en-US': asset,
            // },
          },
        })
      })
      .then((entry) => {
        entry.publish()
      })
      .catch(console.error)
  }


    const postProperty = (data: PostProperty) => {
    const contentful = require('contentful-management')

    const client = contentful.createClient({
      accessToken: process.env.NEXT_CONTENTFUL_PERSONAL_ACCESS_TOKEN as string,
    })
    client
      .getSpace(process.env.NEXT_CONTENTFUL_SPACE_ID as string)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        /* Create object to call createAssetWithId with */
        var fileData = {
          fields: {
            title: {
              'en-US': data.streetAddress + '-' + data.state,
            },
            file: {
              'en-US': {
                contentType: 'image/jpeg',
                fileName: data.streetAddress + '-' + data.state + '.jpg',
                upload: fileValue,
              },
            },
          },
        }
        const asset = environment
          .createAssetWithId(faker.datatype.string(6), fileData)
          .then((asset) => {
            asset.processForAllLocales().then(function (processedAsset) {
              processedAsset.publish().then(function (publishedAsset) {
                console.log(publishedAsset)
              })
            })
            return asset
          })
        /* set a variable that's local to the component */
        setAsset(asset)
        return environment.createEntry('propertyListings', {
          fields: {
            id: {
              'en-US': faker.datatype.string(6) + '-' + data.streetAddress,
            },
            streetAddress: {
              'en-US': data.streetAddress,
            },
            city: {
              'en-US': data.city,
            },
            images: {
              'en-US': '',
            },
          },
        })
      })
      .then((entry) => entry.publish())
      .then((entry) => {
        /* update entry fields */
        entry.fields['image']['en-GB'] = {
          sys: { id: asset.sys.id, linkType: 'Asset', type: 'Link' },
        }
      })
      .catch(console.error)
  }