
import { transformCartesianToWGS84, transformWGS84ToCartesian } from "../trasform";
import _getCircleScanShader from "../shader/circleShader";
import * as Cesium from "cesium";
export function addscan(Iposition: any, _viewer: any,) {

  const id = Iposition.id
  const cartesian = Iposition.position

  const cartesian3Center = cartesian;
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

  const _time = new Date().getTime()
  const _delegate = new Cesium.PostProcessStage({
    name: id,
    fragmentShader: _getCircleScanShader({ get: true, border: Iposition.border }) ?? '',
    uniforms: {
      u_scanCenterEC: () => {
        return Cesium.Matrix4.multiplyByVector(
          _viewer.camera._viewMatrix,
          cartesian4Center,
          new Cesium.Cartesian4()
        )
      },
      u_scanPlaneNormalEC: () => {
        const temp = Cesium.Matrix4.multiplyByVector(
          _viewer.camera._viewMatrix,
          cartesian4Center,
          new Cesium.Cartesian4()
        )
        const temp1 = Cesium.Matrix4.multiplyByVector(
          _viewer.camera._viewMatrix,
          cartesian4Center1,
          new Cesium.Cartesian4()
        )
        const _scratchCartesian3Normal = new Cesium.Cartesian3()
        _scratchCartesian3Normal.x = temp1.x - temp.x
        _scratchCartesian3Normal.y = temp1.y - temp.y
        _scratchCartesian3Normal.z = temp1.z - temp.z
        Cesium.Cartesian3.normalize(
          _scratchCartesian3Normal,
          _scratchCartesian3Normal
        )
        return _scratchCartesian3Normal
      },
      u_radius: () => {
        if (Iposition.circleMode == 'CircleScan') {
          return (
            (Iposition.radius * ((new Date().getTime() - _time) % Iposition.duration)) /
            Iposition.duration
          )
        } else {
          return Iposition.radius
        }
      },
      u_scanColor: Iposition.color,
    }
  })

  _viewer.scene.postProcessStages.add(_delegate)

  return _delegate;
}