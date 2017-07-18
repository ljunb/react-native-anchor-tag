/*
 * A smart anchor tag view for react-native apps
 * https://github.com/ljunb/react-native-anchor-tag/
 * Released under the MIT license
 * Copyright (c) 2017 ljunb <cookiejlim@gmail.com>
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
const {width: screenW} = Dimensions.get('window');

// 45° line length
const LINE_LENGTH = 10;
// anchor label max width
const MAX_LABEL_WIDTH = 70;

// translucent dot width and height
const OUTER_DOT_WIDTH = 8;
// white dot width and height
const INNER_DOT_WIDTH = 4;

// default anchors wrapper width
const DEFAULT_BACKGROUND_WIDTH = screenW - 15 * 2;
// defualt anchor label padding
const DEFAULT_LABEL_PADDING = 4;

export default class AnchorView extends Component {
    static propTypes = {
        anchor: React.PropTypes.object,
        backgroundWidth: React.PropTypes.number,
    };

    static defaultProps = {
        backgroundWidth: DEFAULT_BACKGROUND_WIDTH,
    };

    state = {width: 0};

    handleLabelWidth = evt => {
        const {width} = evt.nativeEvent.layout;
        if (this.state.width !== width) {
            this.setState({width});
        }
    };

    render() {
        const {width} = this.state;
        const {anchor: {name, x, y}, backgroundWidth} = this.props;

        // anchor label max width
        const maxLabelWidth = (width > MAX_LABEL_WIDTH ? MAX_LABEL_WIDTH : width) + DEFAULT_LABEL_PADDING * 2;

        // anchor position
        const left = x || 0, top = y || 0;
        const isLeftDirection = (left + maxLabelWidth) >= backgroundWidth;

        // line style
        const line45Style = isLeftDirection ?
            {transform: [{rotate: '45deg'}], right: (INNER_DOT_WIDTH + OUTER_DOT_WIDTH) / 2} :
            {transform: [{rotate: '-45deg'}], left: (INNER_DOT_WIDTH + OUTER_DOT_WIDTH) / 2};
        const line180Style = isLeftDirection ? {right: LINE_LENGTH + 1} : {left: LINE_LENGTH + 1};

        return (
            <View style={[styles.container, {top, left}]}>
                <Dot style={styles.realDot}/>
                <View style={[styles.line45, line45Style]}/>
                <View style={[styles.line180, line180Style]} onLayout={this.handleLabelWidth}>
                    <Text numberOfLines={2} style={styles.text}>{name}</Text>
                </View>
            </View>
        )
    }
}

const Dot = () => {
    return (
        <View style={[styles.dotWrapper]}>
            <View style={[styles.dot]}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute'
    },
    dotWrapper: {
        backgroundColor: 'rgba(0,0,0,0.15)',
        width: OUTER_DOT_WIDTH,
        height: OUTER_DOT_WIDTH,
        borderRadius: OUTER_DOT_WIDTH / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        width: INNER_DOT_WIDTH,
        height: INNER_DOT_WIDTH,
        backgroundColor: '#ffffff',
        borderRadius: INNER_DOT_WIDTH / 2
    },
    text: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 12,
        lineHeight: 14,
        maxWidth: MAX_LABEL_WIDTH
    },
    realDot: {
        position: 'absolute',
        bottom: 0
    },
    line45: {
        height: LINE_LENGTH,
        width: LINE_LENGTH,
        transform: [{rotate: '45deg'}],
        borderTopWidth: 1,
        borderColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: 'transparent'
    },
    line180: {
        padding: DEFAULT_LABEL_PADDING,
        borderBottomWidth: 1,
        borderColor: '#ffffff',
        position: 'absolute',
        bottom: LINE_LENGTH + 1,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: 'transparent'
    },
});