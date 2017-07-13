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

const LINE_LENGTH = 10;     // 45°线长度
const MAX_WIDTH = 70;       // 锚点文本最大长度
const OUTER_DOT_WIDTH = 8;  // 外圆宽高
const INNER_DOT_WIDTH = 4;  // 内圆宽高

// 默认的背景视图宽高
const DEFAULT_BACKGROUND_WIDTH = screenW - 15*2;

export default class AnchorView extends Component {
    static propTypes = {
        anchor: React.PropTypes.object,
        backgroundWidth: React.PropTypes.number,
    };

    static defaultProps = {
        backgroundWidth: DEFAULT_BACKGROUND_WIDTH,
    };

    constructor(props) {
        super(props);
        this.state = this.mergeProps(props);
    }

    componentWillReceiveProps(newProps) {
        this.setState(this.mergeProps(newProps));
    }

    mergeProps = props => {
        const {backgroundWidth, anchor} = props;
        const left = anchor.x || 0, top = anchor.y || 0;

        const isLeftDirection = (left + MAX_WIDTH) >= backgroundWidth;
        const line45Style = isLeftDirection ?
            {transform: [{rotate: '45deg'}], right: (INNER_DOT_WIDTH + OUTER_DOT_WIDTH) / 2} :
            {transform: [{rotate: '-45deg'}], left: (INNER_DOT_WIDTH + OUTER_DOT_WIDTH) / 2};
        const line180Style = isLeftDirection ? {right: LINE_LENGTH + 1} : {left: LINE_LENGTH + 1};

        return {line45Style, line180Style, left, top};
    };

    render() {
        const {line45Style, line180Style, left, top} = this.state;
        const {anchor: {name}} = this.props;

        return (
            <View style={[styles.container, {top, left}]}>
                <Dot style={styles.realDot}/>
                <View style={[styles.line45, line45Style]}/>
                <View style={[styles.line180, line180Style]}>
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
        zIndex: -1,
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
        maxWidth: MAX_WIDTH
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
        padding: 4,
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