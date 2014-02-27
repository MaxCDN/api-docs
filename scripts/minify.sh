#!/bin/bash

# ensure uglifyjs is installed and available
which uglifyjs 2>&1 > /dev/null && UGLIFYJS=$(which uglifyjs)

test "$UGLIFYJS" || \
  test -x ./node_modules/.bin/uglifyjs 2>&1 > /dev/null && \
    UGLIFY=./node_modules/.bin/uglifyjs

if ! test "$UGLIFYJS"
then
  echo "uglifyjs command not found, ensure your running this from api-docs root"
  exit 1
fi

# ensure uglifycss is installed and available
which uglifycss 2>&1 > /dev/null && UGLIFYCSS=$(which uglifycss)

test "$UGLIFYCSS" || \
  test -x ./node_modules/.bin/uglifycss 2>&1 > /dev/null && \
    UGLIFY=./node_modules/.bin/uglifycss

if ! test "$UGLIFYCSS"
then
  echo "uglifycss command not found, ensure your running this from api-docs root"
  exit 1
fi

for file in $(find ./{build,contents}/js -type f -name '*.js' -and -not -name '*.min.js')
do
  echo "uglifyjs $file \ "
  echo -e "\t--output $(echo $file | sed 's/\.js/.min.js/')"
  echo " "
  $UGLIFYJS $file --output $(echo $file | sed 's/\.js/.min.js/')
done

for file in $(find ./{build,contents}/css -type f -name '*.css' -and -not -name '*.min.css')
do
  echo "uglifycss $file > \ "
  echo -e "\t$(echo $file | sed 's/\.css/.min.css/')"
  echo " "
  $UGLIFYCSS $file > $(echo $file | sed 's/\.css/.min.css/')
done
