<template>
  <div class="uploader">
    <div class="weui_cell uploader" :class="{'not-title': !title}">
      <div class="weui_cell_bd" v-if="title">
        <p>{{title}}<span class="sub-title" v-if="subTitle">（{{subTitle}}）</span></p>
      </div>
    </div>
    <div class="weui_uploader">
      <div class="weui_uploader_bd">
        <ul class="weui_uploader_files">
          <li class="weui_uploader_file"
              :style="{ 'background-image': 'url(' + localId + ')' }"
              @click="remove($index)"
              v-for="localId in local.localIds"
              v-if="localId"
              track-by="$index">
            <div v-if="!validImgExt(models[$index])" class="pic-error"><span>图片错误</span><span>支持.jpg/.png</span></div>
          </li>
        </ul>
        <!--<ul class="weui_uploader_files">-->
          <!--<li class="weui_uploader_file"-->
              <!--:style="{ 'background-image': 'url(' + img.url + ')' }"-->
              <!--@click="remove(img)"-->
              <!--v-for="img in models"-->
              <!--v-if="img.url">-->
            <!--<div v-if="!validImgExt(img.extension)" class="pic-error"><span>图片错误</span><span>支持.jpg/.png</span></div>-->
          <!--</li>-->
        <!--</ul>-->
        <div class="weui_uploader_input_wrp" @click="chooseImg" v-show="spareCount > 0"></div>
      </div>
    </div>
  </div>
</template>

<script type="text-ecmascript-6">
  import { chooseImage, uploadImage, getLocalImgData } from '../../vue/mixins/wxJssdk'
  import InlineDesc from 'vux-src-components/inline-desc'

  export default {
    components: {
      InlineDesc
    },

    props: {
      title: String,
      subTitle: String,
      maxCount: {
        type: Number,
        default: 9
      },
      models: {
        type: Array,
        default () {
          return []
        }
      },
      sourceType: {
        type: Array
      },
      uploadStatus: {
        type: String,
        default: 'free', // free, uploading
        twoWay: true
      },
      uploadProgress: {
        type: Object,
        twoWay: true
      },
      uploadSwitch: { // 是否可上传 开关
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        local: {
          localIds: []
        }
      }
    },

    computed: {
      nowCount () {
        return this.local.localIds.length
      },
      spareCount () {
        return this.maxCount - this.nowCount
      }
    },

    watch: {
      'models' (val) {
        if (val.length === 0) {
          this.local.localIds = []
        }
      }
    },

    methods: {
      validImgExt (model) {
        if (model) {
          return (model.extension === 'jpg') || (model.extension === 'png')
        } else {
          return true
        }
      },
      chooseImg () {
        if (this.uploadStatus === 'uploading') {
          this.toast('请等待前一次图片上传完成')
          return
        }
        chooseImage({count: this.spareCount, sourceType: this.sourceType}).then((localIds) => {
          if (this.base.isWKWebview) {
            getLocalImgData(localIds, this.local.localIds)
          } else {
            localIds.forEach((ele) => {
              this.local.localIds.push(ele)
            })
          }
          this.uploadStatus = 'uploading'
          uploadImage(localIds, this.uploadProgress).then((results) => {
            results.forEach((ele) => {
              this.models.push(ele)
            })
            this.uploadStatus = 'free'
          })
        }).catch((data) => {
          this.uploadStatus = 'free'
          if (data === 'cancel') {
          } else {
            this.handleHttpError(data)
          }
        })
      },
      remove (index) {
        if (this.uploadStatus === 'uploading') {
          this.toast('请等待上传完成再进行删除操作')
          return
        }
        let removeImage = () => {
          this.local.localIds.splice(index, 1)
          this.models.splice(index, 1)
        }
        this.confirm({
          cancelText: '取消',
          title: '确定删除吗?',
          text: '',
          onConfirm: removeImage,
          onCancel: _.noop
        })
      }
    }
  }
</script>

<style lang="less">
  @import '~vux-src-styles/weui/widget/weui_cell/weui_uploader.less';
</style>

<style lang="scss">
@import '~assets/sass/config';

.uploader {
  flex-direction: column;
  border-top: 0;
  &:before {
    display: none;
  }
  &.not-title {
    padding: 0 15px 10px;
  }
  .weui_cell_bd {
    width: 100%;
    > p {
      color: $colorTit;
      .sub-title {
        font-size: 14px;
        color: $colorText;
      }
    }
  }
  .weui_uploader {
    padding: 10px 15px;
    .weui_uploader_file {
      margin-right: 6px;
      margin-bottom: 6px;
      width: 1.56rem;
      height: 1.56rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      .pic-error {
        width: 100%;
        height: 100%;
        font-size: 13px;
        flex-direction: column;
        @include center-flex;
        background-color: rgba(255,255,255,.8);
      }
    }
    .weui_uploader_input_wrp {
      margin-right: 6px;
      margin-bottom: 6px;
      width: 1.56rem;
      height: 1.56rem;
    }
  }
}

</style>
