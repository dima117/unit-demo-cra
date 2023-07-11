TAG=$(echo $REF | cut -d "/" -f 3) # getting tag from ref

gh release create $TAG # creating release