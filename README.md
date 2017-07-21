# react-native-anchor-tag

[![npm](https://img.shields.io/npm/v/react-native-anchor-tag.svg)](https://www.npmjs.com/package/react-native-anchor-tag)
[![npm](https://img.shields.io/npm/dt/react-native-anchor-tag.svg)](https://www.npmjs.com/package/react-native-anchor-tag)
[![npm](https://img.shields.io/npm/l/react-native-anchor-tag.svg)](https://github.com/ljunb/react-native-anchor-tag/blob/master/LICENSE)

A light anchor tag view for react-native apps. You may be used to display some anchor tag information for the image. Written in JS for cross-platform support. Enjoy it! 🎉🎉

## Preview

![ios](https://github.com/ljunb/react-native-anchor-tag/blob/master/screenshot/ios.png)
![android](https://github.com/ljunb/react-native-anchor-tag/blob/master/screenshot/android.png)

## Install

Install with npm:
```
npm install react-native-anchor-tag --save
```
or with yarn:
```
yarn add react-native-anchor-tag
```

## Demo

See [RNAnchorTagDemo](https://github.com/ljunb/RNAnchorTagDemo).

## Usage

```js
import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image
} from 'react-native';
import AnchorView from "react-native-anchor-tag";
const {width: screenW} = Dimensions.get('window');

export default class RNAnchorTagDemo extends Component {
    data = {
        coverHeight: 646,   // source image height
        coverWidth: 750,    // source image width
        tagList: [
            {name: '远处云层', x: 100, y: 150},
            {name: '明亮的太阳', x: 640, y: 410},
            {name: '书页', x: 280, y: 460},
            {name: '木地板', x: 400, y: 600}
        ]
    };

    renderAnchorItem = (tag, key) => {
        const {coverWidth, coverHeight} = this.data;
        const {x, y} = tag;

        // expect image width
        const imgWidth = screenW - 15 * 2;
        // convert image height base on expect width
        const imgHeight = imgWidth * coverHeight / coverWidth;

        // convert anchor position base on the expect image layout
        const convertX = x * imgWidth / coverWidth;
        const convertY = y * imgHeight / coverHeight;

        return <AnchorView key={key} anchor={{...tag, x: convertX, y: convertY}}/>
    };

    render() {
        const {tagList, coverHeight, coverWidth} = this.data;
        const uri = 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg';

        // convert to expect image layout
        const imgWidth = screenW - 15 * 2;
        const imgHeight = imgWidth * coverHeight / coverWidth;

        return (
            <View style={styles.container}>
                <Image style={{width: imgWidth, height: imgHeight}} source={{uri}}>
                    {tagList.map(this.renderAnchorItem)}
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 15
    },
});
```

## Props

Prop              | Type   | Optional | Default   | Description
----------------  | ------ | -------- | --------- | -----------
anchor            | object | No       |           | anchor entity (name, x, y)
backgroundWidth   | number | Yes      | screenW - 15*2       | determine the width of the background container that will change the direction of the anchor tag