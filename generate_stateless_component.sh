#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
    echo 'Invalid component name.'
    exit 1
fi

COMPONENT_PATH="$(pwd)/js/common/$1"

mkdir $COMPONENT_PATH;

# package.json
touch "$COMPONENT_PATH/package.json";
echo "{
  \"name\": \"$1\",
  \"version\": \"0.0.0\",
  \"private\": true,
  \"main\": \"./$1.js\"
}" >> "$COMPONENT_PATH/package.json";

# js
touch "$COMPONENT_PATH/$1.js";
echo "import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import s from './$1.style';

const $1 = ({ title }) => {
  return (
    <View style={s.root}>
      <Text style={s.title}>{title}</Text>
    </View>
  );
};

$1.propTypes = {};

export default $1;" >> "$COMPONENT_PATH/$1.js";

# style
touch "$COMPONENT_PATH/$1.style.js";
echo "import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
});" >> "$COMPONENT_PATH/$1.style.js";

echo "--- Successful generation: $1 (stateless) ---"
