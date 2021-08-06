## To do
    X Add modal
    X Make sure state is set before posting to contentful
    Fix changeColor()
    XPost Property
    Figure out access to post property
    Override textfield in createMui()
    Break the createEntry call to make sure things works as should when it's fixed

## You have to use environment.getEntry(EntryIDHere) and 
##    then convert the return into an object using .toPlainObject(); and 
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
