import * as Cesium from "cesium";
import { transformCartesianToWGS84, transformWGS84ToCartesian } from "../trasform";
import _getRadarScanShader from "../shader/scanCircleShader";
export function setRadarScanEffect(options: any, _viewer: any) {
  if (options && options.position) {

    const id = options.id
    const cartesian = options.position
    const duration = options.duration
    const border = options.border
    const width = options.width ?? 10
    const radius = options.radius
    const color = options.color

    const cartesian3Center = cartesian
    const cartesian4Center = new Cesium.Cartesian4(
      cartesian3Center.x,
      cartesian3Center.y,
      cartesian3Center.z,
      1
    )
    const position: any = transformCartesianToWGS84(cartesian)
    const cartesian3Center1 = transformWGS84ToCartesian(
      {
        lng: position.lng,
        lat: position.lat,
        alt: position.alt + 500
      }
    )
    const cartesian4Center1 = new Cesium.Cartesian4(
      cartesian3Center1.x,
      cartesian3Center1.y,
      cartesian3Center1.z,
      1
    )

    const cartesian3Center2 = transformWGS84ToCartesian(
      {
        lng: position.lng + 0.001,
        lat: position.lat,
        alt: position.alt
      }
    )
    const cartesian4Center2 = new Cesium.Cartesian4(
      cartesian3Center2.x,
      cartesian3Center2.y,
      cartesian3Center2.z,
      1
    )
    const _time = new Date().getTime()
    const _RotateQ = new Cesium.Quaternion()
    const _RotateM = new Cesium.Matrix3()
    const _scratchCartesian4Center = new Cesium.Cartesian4()
    const _scratchCartesian4Center1 = new Cesium.Cartesian4()
    const _scratchCartesian4Center2 = new Cesium.Cartesian4()
    const _scratchCartesian3Normal = new Cesium.Cartesian3()
    const _scratchCartesian3Normal1 = new Cesium.Cartesian3()
    const _delegate = new Cesium.PostProcessStage({
      name: id,
      fragmentShader: _getRadarScanShader({ border: border, width: width, get: true }) ?? '',
      uniforms: {
        u_scanCenterEC: function () {
          return Cesium.Matrix4.multiplyByVector(
            _viewer.camera._viewMatrix,
            cartesian4Center,
            _scratchCartesian4Center
          )
        },
        u_scanPlaneNormalEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(
            _viewer.camera._viewMatrix,
            cartesian4Center,
            _scratchCartesian4Center
          )
          const temp1 = Cesium.Matrix4.multiplyByVector(
            _viewer.camera._viewMatrix,
            cartesian4Center1,
            _scratchCartesian4Center1
          )
          _scratchCartesian3Normal.x = temp1.x - temp.x
          _scratchCartesian3Normal.y = temp1.y - temp.y
          _scratchCartesian3Normal.z = temp1.z - temp.z
          Cesium.Cartesian3.normalize(
            _scratchCartesian3Normal,
            _scratchCartesian3Normal
          )
          return _scratchCartesian3Normal
        },

        u_scanLineNormalEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(
            _viewer.camera._viewMatrix,
            cartesian4Center,
            _scratchCartesian4Center
          )
          const temp1 = Cesium.Matrix4.multiplyByVector(
            _viewer.camera._viewMatrix,
            cartesian4Center1,
            _scratchCartesian4Center1
          )
          const temp2 = Cesium.Matrix4.multiplyByVector(
            _viewer.camera._viewMatrix,
            cartesian4Center2,
            _scratchCartesian4Center2
          )

          _scratchCartesian3Normal.x = temp1.x - temp.x
          _scratchCartesian3Normal.y = temp1.y - temp.y
          _scratchCartesian3Normal.z = temp1.z - temp.z

          Cesium.Cartesian3.normalize(
            _scratchCartesian3Normal,
            _scratchCartesian3Normal
          )

          _scratchCartesian3Normal1.x = temp2.x - temp.x
          _scratchCartesian3Normal1.y = temp2.y - temp.y
          _scratchCartesian3Normal1.z = temp2.z - temp.z

          const tempTime =
            ((new Date().getTime() - _time) % duration) / duration
          Cesium.Quaternion.fromAxisAngle(
            _scratchCartesian3Normal,
            tempTime * Cesium.Math.PI * 2,
            _RotateQ
          )
          Cesium.Matrix3.fromQuaternion(_RotateQ, _RotateM)
          Cesium.Matrix3.multiplyByVector(
            _RotateM,
            _scratchCartesian3Normal1,
            _scratchCartesian3Normal1
          )
          Cesium.Cartesian3.normalize(
            _scratchCartesian3Normal1,
            _scratchCartesian3Normal1
          )
          return _scratchCartesian3Normal1
        },
        u_radius: radius,
        u_scanColor: color
      }
    })

    _viewer.scene.postProcessStages.add(_delegate)

    return _delegate;
  }
}