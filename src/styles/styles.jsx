import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    flexCenter: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexEnd2: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    flexEnd: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    flexStart: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    flexStart2: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    flexBaseLine: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    flexBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    /*-------------------------------------------------------------------------- */
    flexFull: {
        flex: 1,
    },
    wFull: {
        width: '100%',
    },
    hFull: {
        height: '100%',
    },

    /*-------------------------------------------------------------------------- */
    relative: {
        position: 'relative',
    },
    absolute: {
        position: 'absolute',
    },

    /*-------------------------------------------------------------------------- */
    t0: {
        top: 0,
    },
    l0: {
        left: 0,
    },
    r0: {
        right: 0,
    },
    b0: {
        bottom: 0,
    },
    inset0: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    /*-------------------------------------------------------------------------- */
    z10: {
        zIndex: 10,
    },
    z20: {
        zIndex: 20,
    },
    z30: {
        zIndex: 30,
    },
    z40: {
        zIndex: 40,
    },
    z50: {
        zIndex: 50,
    },
    z100: {
        zIndex: 100,
    },

    /*-------------------------------------------------------------------------- */
    opacity0: {
        opacity: 0,
    },
    opacity50: {
        opacity: 0.5,
    },
    opacity1: {
        opacity: 1,
    },

    /*-------------------------------------------------------------------------- */
    w250: {
        width: 250,
    },
    w42: {
        width: 42,
    },
    /*-------------------------------------------------------------------------- */
    h32: {
        height: 32,
    },
    h42: {
        height: 42,
    },
    h46: {
        height: 46,
    },
    h48: {
        height: 48,
    },

    /*-------------------------------------------------------------------------- */
    cover: {
        resizeMode: 'cover',
    },
    contain: {
        resizeMode: 'contain',
    },

    /*-------------------------------------------------------------------------- */
    hidden: {
        overflow: 'hidden',
    },
    scroll: {
        overflow: 'scroll',
    },
    /*-------------------------------------------------------------------------- */
    gap15: {
        gap: 15,
    },
    gap20: {
        gap: 20,
    },
    /*-------------------------------------------------------------------------- */
    bgBlack: {
        backgroundColor: '#000',
    },
    bgBlack50: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bgWhite: {
        backgroundColor: '#fff',
    },
    bg161e: {
        backgroundColor: '#161E28',
    },
    bgRed: {
        backgroundColor: '#E8424A',
    },
    bgGray: {
        backgroundColor: '#5F5F5F',
    },
    bgGray161: {
        backgroundColor: '#161E28',
    },
    bgGray0c1: {
        backgroundColor: '#0C1116',
    },
    bgGray2727: {
        backgroundColor: 'rgba(27, 27, 27, 0.00)',
    },
    bgBlue212: {
        backgroundColor: '#212E48',
    },
    bgBlue237: {
        backgroundColor: '#2374E1',
    },
    bgBlue1A7: {
        backgroundColor: '#1A73E8',
    },
    bgBlue009: {
        backgroundColor: '#0091FF',
    },
    bgYellow: {
        backgroundColor: '#FFB848',
    },
    bgCyan2F: {
        backgroundColor: '#2F9881',
    },
    bgTransparent: {
        backgroundColor: 'transparent',
    },
    /*-------------------------------------------------------------------------- */
    textWhite: {
        color: 'white',
    },
    textWhite30: {
        color: 'rgba(255,255,255,0.3)',
    },
    textWhite80: {
        color: 'rgba(255,255,255,0.8)',
    },
    textGray77: {
        color: 'rgba(119,125,146,0.8)',
    },
    textYellow: {
        color: '#FFB848',
    },
    textCyan2F: {
        color: '#2F9881',
    },
    textRedE8: {
        color: '#E8424A',
    },
    textCenter: {
        textAlign: 'center',
    },
    textRight: {
        textAlign: 'right',
    },
    textUpper: {
        textTransform: 'uppercase',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top', // Để đoạn văn bản bắt đầu từ đầu của hộp văn bản
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textAreaRate: {
        height: 80,
        textAlignVertical: 'top', // Để đoạn văn bản bắt đầu từ đầu của hộp văn bản
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textItalic: {
        fontStyle: 'italic',
    },
    /*-------------------------------------------------------------------------- */
    itemsCenter: {
        alignItems: 'center',
    },
    itemsLeft: {
        alignItems: 'left',
    },
    itemsRight: {
        alignItems: 'right',
    },
    itemsStart: {
        alignItems: 'flex-start',
    },
    itemsEnd: {
        alignItems: 'flex-end',
    },

    /*-------------------------------------------------------------------------- */
    alignContentStart: {
        alignContent: 'flex-start',
    },
    alignContentCenter: {
        alignContent: 'center',
    },
    alignContentEnd: {
        alignContent: 'flex-end',
    },

    /*-------------------------------------------------------------------------- */
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },

    /*-------------------------------------------------------------------------- */
    fw300: {
        fontWeight: 300,
    },
    fw400: {
        fontWeight: 400,
    },
    fw500: {
        fontWeight: 500,
    },
    fw600: {
        fontWeight: 600,
    },
    fw700: {
        fontWeight: 700,
    },
    fwNormal: {
        fontWeight: 'normal',
    },
    fwBold: {
        fontWeight: 'bold',
    },

    /*-------------------------------------------------------------------------- */
    fs11: {
        fontSize: 11,
    },
    fs12: {
        fontSize: 12,
    },
    fs13: {
        fontSize: 13,
    },
    fs14: {
        fontSize: 14,
    },
    fs15: {
        fontSize: 15,
    },
    fs16: {
        fontSize: 16,
    },
    fs18: {
        fontSize: 18,
    },
    fs22: {
        fontSize: 22,
    },
    fs24: {
        fontSize: 24,
    },
    fs27: {
        fontSize: 27,
    },
    fs28: {
        fontSize: 28,
    },
    fs32: {
        fontSize: 32,
    },
    fs42: {
        fontSize: 42,
    },
    /*-------------------------------------------------------------------------- */
    p5: {
        padding: 5,
    },
    px5: {
        paddingHorizontal: 5,
    },
    py5: {
        paddingVertical: 5,
    },
    pt5: {
        paddingTop: 5,
    },
    pb5: {
        paddingBottom: 5,
    },
    pl5: {
        paddingLeft: 5,
    },
    pr5: {
        paddingRight: 5,
    },

    m5: {
        margin: 5,
    },
    mx5: {
        marginHorizontal: 5,
    },
    my5: {
        marginVertical: 5,
    },
    mt5: {
        marginTop: 5,
    },
    mb5: {
        marginBottom: 5,
    },
    ml5: {
        marginLeft: 5,
    },
    mr5: {
        marginRight: 5,
    },

    /*-------------------------------------------------------------------------- */
    p10: {
        padding: 10,
    },
    px10: {
        paddingHorizontal: 10,
    },
    py10: {
        paddingVertical: 10,
    },
    pt10: {
        paddingTop: 10,
    },
    pb10: {
        paddingBottom: 10,
    },
    pl10: {
        paddingLeft: 10,
    },
    pr10: {
        paddingRight: 10,
    },

    m10: {
        margin: 10,
    },
    mx10: {
        marginHorizontal: 10,
    },
    my10: {
        marginVertical: 10,
    },
    mt10: {
        marginTop: 10,
    },
    mb10: {
        marginBottom: 10,
    },
    ml10: {
        marginLeft: 10,
    },
    mr10: {
        marginRight: 10,
    },

    /*-------------------------------------------------------------------------- */
    p12: {
        padding: 12,
    },
    px12: {
        paddingHorizontal: 12,
    },
    py12: {
        paddingVertical: 12,
    },
    pt12: {
        paddingTop: 12,
    },
    pb12: {
        paddingBottom: 12,
    },
    pl12: {
        paddingLeft: 12,
    },
    pr12: {
        paddingRight: 12,
    },

    m12: {
        margin: 12,
    },
    mx12: {
        marginHorizontal: 12,
    },
    my12: {
        marginVertical: 12,
    },
    mt12: {
        marginTop: 12,
    },
    mb12: {
        marginBottom: 12,
    },
    ml12: {
        marginLeft: 12,
    },
    mr12: {
        marginRight: 12,
    },

    /*-------------------------------------------------------------------------- */
    p15: {
        padding: 15,
    },
    px15: {
        paddingHorizontal: 15,
    },
    py15: {
        paddingVertical: 15,
    },
    pt15: {
        paddingTop: 15,
    },
    pb15: {
        paddingBottom: 15,
    },
    pl15: {
        paddingLeft: 15,
    },
    pr15: {
        paddingRight: 15,
    },

    m15: {
        margin: 15,
    },
    mx15: {
        marginHorizontal: 15,
    },
    my15: {
        marginVertical: 15,
    },
    mt15: {
        marginTop: 15,
    },
    mb15: {
        marginBottom: 15,
    },
    ml15: {
        marginLeft: 15,
    },
    mr15: {
        marginRight: 15,
    },
    /*-------------------------------------------------------------------------- */
    p20: {
        padding: 20,
    },
    px20: {
        paddingHorizontal: 20,
    },
    py20: {
        paddingVertical: 20,
    },
    pt20: {
        paddingTop: 20,
    },
    pb20: {
        paddingBottom: 20,
    },
    pl20: {
        paddingLeft: 20,
    },
    pr20: {
        paddingRight: 20,
    },

    m20: {
        margin: 20,
    },
    mx20: {
        marginHorizontal: 20,
    },
    my20: {
        marginVertical: 20,
    },
    mt20: {
        marginTop: 20,
    },
    mb20: {
        marginBottom: 20,
    },
    ml20: {
        marginLeft: 20,
    },
    mr20: {
        marginRight: 20,
    },
    /*-------------------------------------------------------------------------- */
    p24: {
        padding: 24,
    },
    px24: {
        paddingHorizontal: 24,
    },
    py24: {
        paddingVertical: 24,
    },
    pt24: {
        paddingTop: 24,
    },
    pb24: {
        paddingBottom: 24,
    },
    pl24: {
        paddingLeft: 24,
    },
    pr24: {
        paddingRight: 24,
    },

    m24: {
        margin: 24,
    },
    mx24: {
        marginHorizontal: 24,
    },
    my24: {
        marginVertical: 24,
    },
    mt24: {
        marginTop: 24,
    },
    mb24: {
        marginBottom: 24,
    },
    ml24: {
        marginLeft: 24,
    },
    mr24: {
        marginRight: 24,
    },
    /*-------------------------------------------------------------------------- */
    p30: {
        padding: 30,
    },
    px30: {
        paddingHorizontal: 30,
    },
    py30: {
        paddingVertical: 30,
    },
    pt30: {
        paddingTop: 30,
    },
    pb30: {
        paddingBottom: 30,
    },
    pl30: {
        paddingLeft: 30,
    },
    pr30: {
        paddingRight: 30,
    },

    m30: {
        margin: 30,
    },
    mx30: {
        marginHorizontal: 30,
    },
    my30: {
        marginVertical: 30,
    },
    mt30: {
        marginTop: 30,
    },
    mb30: {
        marginBottom: 30,
    },
    ml30: {
        marginLeft: 30,
    },
    mr30: {
        marginRight: 30,
    },
    /*-------------------------------------------------------------------------- */
    p50: {
        padding: 50,
    },
    px50: {
        paddingHorizontal: 50,
    },
    py50: {
        paddingVertical: 50,
    },
    pt50: {
        paddingTop: 50,
    },
    pb50: {
        paddingBottom: 50,
    },
    pl50: {
        paddingLeft: 50,
    },
    pr50: {
        paddingRight: 50,
    },

    m50: {
        margin: 50,
    },
    mx50: {
        marginHorizontal: 50,
    },
    my50: {
        marginVertical: 50,
    },
    mt50: {
        marginTop: 50,
    },
    mb50: {
        marginBottom: 50,
    },
    ml50: {
        marginLeft: 50,
    },
    mr50: {
        marginRight: 50,
    },
    /*-------------------------------------------------------------------------- */
    p60: {
        padding: 60,
    },
    px60: {
        paddingHorizontal: 60,
    },
    py60: {
        paddingVertical: 60,
    },
    pt60: {
        paddingTop: 60,
    },
    pb60: {
        paddingBottom: 60,
    },
    pl60: {
        paddingLeft: 60,
    },
    pr60: {
        paddingRight: 60,
    },

    m60: {
        margin: 60,
    },
    mx60: {
        marginHorizontal: 60,
    },
    my60: {
        marginVertical: 60,
    },
    mt60: {
        marginTop: 60,
    },
    mb60: {
        marginBottom: 60,
    },
    ml60: {
        marginLeft: 60,
    },
    mr60: {
        marginRight: 60,
    },

    /*-------------------------------------------------------------------------- */
    lh20: {
        lineHeight: 20,
    },
    lh22: {
        lineHeight: 22,
    },
    lh24: {
        lineHeight: 24,
    },
    lh32: {
        lineHeight: 32,
    },
    lh40: {
        lineHeight: 40,
    },

    /*-------------------------------------------------------------------------- */
    uppercase: {
        textTransform: 'uppercase',
    },

    /*-------------------------------------------------------------------------- */
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    doted: {
        borderStyle: 'dotted',
    },
    dashed: {
        borderStyle: 'dashed',
    },
    borderSolid: {
        borderStyle: 'solid',
    },
    border4: {
        borderRadius: 4,
    },
    border10: {
        borderRadius: 10,
    },

    border1: {
        borderWidth: 1,
    },
    borderTop: {
        borderTopColor: 'rgba(34,43,53,1)',
        borderTopWidth: 1,
    },
    borderBot: {
        borderBottomColor: 'rgba(34,43,53,1)',
        borderBottomWidth: 1,
    },
    borderBot5: {
        borderBottomColor: 'rgba(34, 43, 53, 0.05)',
        borderBottomWidth: 1,
    },
    borderRight: {
        borderRightColor: 'rgba(34,43,53,1)',
        borderRightWidth: 1,
    },
    borderLeft: {
        borderLeftColor: 'rgba(34,43,53,1)',
        borderLeftWidth: 1,
    },
    borderColorRedE8: {
        borderColor: '#E8424A',
    },
    borderColorCyan2F: {
        borderColor: '#2F9881',
    },
    borderColor3e9: {
        borderColor: '#3E97FF',
    },
    borderColor777: {
        borderColor: '#777D92',
    },
    borderColorWhite: {
        borderColor: '#fff',
    },
    borderFull: {
        borderRadius: 999,
    },
    borderLeftTop4: {
        borderTopLeftRadius: 4,
    },
    borderLeftBot4: {
        borderBottomLeftRadius: 4,
    },
    borderRightTop4: {
        borderTopRightRadius: 4,
    },
    borderRightBot4: {
        borderBottomRightRadius: 4,
    },

    /*-------------------------------------------------------------------------- */
    logoPrimary: {
        width: 227,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    rulesBefore: {
        backgroundColor: '#777D92',
        width: 1,
        height: 15,
        marginHorizontal: 12,
    },
    card: {
        backgroundColor: '#161E28',
        padding: 10,
        elevation: 3,
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    button: {
        padding: 10,
        backgroundColor: "#2196F3",
        borderRadius: 5,
        width: 100,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Màu nền mờ xung quanh
      },
});
export default styles;
