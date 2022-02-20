import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import generateArticleOgp from '../../plugins/generateArticleOgp'
const cors = require('cors')({ origin: true })
admin.initializeApp()

const notifySlack = (message: String) => {
  const { IncomingWebhook } = require('@slack/webhook')
  const webhook = new IncomingWebhook(functions.config().slack.webhookurl)
  ;(async () => {
    await webhook.send({
      text: message,
    })
  })()
}

export const getOgpInfo = functions
  .region('asia-northeast1')
  .https.onRequest((req: any, res: any) => {
    return cors(req, res, async () => {
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-Methods', 'POST')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
      res.set('Access-Control-Max-Age', '3600')

      const cheerio = require('cheerio')
      const request = require('request')
      const url = req.body.url

      await request(url, (e: any, _res: any, html: any) => {
        if (e) {
          console.error(e)
          notifySlack(e)
        }
        try {
          const ogp = {
            title: '',
            description: '',
            image: '',
          }
          const $ = cheerio.load(html)
          ogp.title = $('title').text()
          if ($("meta[property='og:image']").attr('content')) {
            ogp.image = $("meta[property='og:image']").attr('content')
          } else {
            ogp.image =
              'https://storage.googleapis.com/portfolio21-56e7e.appspot.com/articles/placeholder/lazy_with_icon.png'
          }
          ogp.description = $("meta[property='og:description']").attr('content')

          res.send({ ogp })
        } catch (e) {
          notifySlack(String(e))
          res.status(500).send({ error: e })
        }
      })
    })
  })

/**
 * API
 * @param title OGPを作る文字列
 * @param questionId questionID
 */
export const createOgpImageAndSave = functions.https.onRequest(
  (request: any, response: any) => {
    return cors(request, response, async () => {
      response.set('Access-Control-Allow-Origin', '*')
      response.set('Access-Control-Allow-Methods', 'POST')
      response.set('Access-Control-Allow-Headers', 'Content-Type')

      // const upload = async (image: Buffer, slug: string): Promise<void> => {
      //   const loaclTargetPath = `/tmp/target.png`
      //   const targetPath = `ogp/files/${slug}.png`

      //   fs.writeFileSync(loaclTargetPath, image)

      //   // Storageにアップロード
      //   await admin
      //     .storage()
      //     .bucket(functions.config().cloud_storage.bucket)
      //     .upload(loaclTargetPath, { destination: targetPath })

      //   // tmpファイルの削除
      //   fs.unlinkSync(loaclTargetPath)
      // }

      const body = request.body
      const imageURL = await generateArticleOgp(body.title)
      // await upload(image, body.slug)
      response.send({
        url: imageURL,
      })
    })
  }
)

// FIX: ベータ版の機能だからかfirebase-functionsの現バージョンで使えない？
// exports.sendOnRegressedIssue = functions.crashlytics
//   .issue()
//   .onRegressed(async (issue) => {
//     const issueId = issue.issueId
//     const issueTitle = issue.issueTitle
//     const appName = issue.appInfo.appName
//     const appPlatform = issue.appInfo.appPlatform
//     const latestAppVersion = issue.appInfo.latestAppVersion

//     const slackMessage =
//       `<!here|here> There is a new issue - ${issueTitle} (${issueId}) ` +
//       `in ${appName}, version ${latestAppVersion} on ${appPlatform}`

//     await notifySlack(slackMessage)
//     console.log(`Posted new issue ${issueId} successfully to Slack`)
//   })
