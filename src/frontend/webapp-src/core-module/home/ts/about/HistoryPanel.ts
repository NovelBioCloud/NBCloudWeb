
import * as moment from 'moment'
class History {
    id: string
    time: string
    content: string
}

/**
 * 公司发展信息
 *
 * @export
 * @class HistoryPanel
 */
export class HistoryPanel {

    container: JQuery
    panel: JQuery
    timePanel: JQuery
    timelinePanel: JQuery
    contentPanel: JQuery
    template = `<div class='history-info'>
            <div class='history-times fn-timePanel'>
            </div>
            <div class='history-timelines fn-timelinePanel'>
            </div>
            <div class='history-contents fn-contentPanel'>
            </div>
        </div>`

    constructor({ container }) {
        this.container = container
        this.panel = $(this.template).appendTo(this.container)
        this.timePanel = this.panel.find('.fn-timePanel')
        this.timelinePanel = this.panel.find('.fn-timelinePanel')
        this.contentPanel = this.panel.find('.fn-contentPanel')
        this.loadData()
    }
    private createTimeUnit(time) {
        const _time = moment(time).format('YYYY-MM')
        return $(`<div class='history-time'>${_time}</div>`)
    }
    private createTimelineUnit() {
        return $(`<div class='history-timeline'>
                    <div class='history-timeline-image'></div>
                </div>`)
    }
    private createContentUnit(content: string) {
        // const contentItemsString = content.split('\n').filter((value, index) => index < 2)
        //     .map(item => `<div class='history-content-item'>${item}</div>`)
        //     .join(' ')
        return $(`<div class='history-content'>
            <div class='history-content-items-table'>
                <div class='history-content-items-cell'>
                    <div class='history-content-items'>
                        <div class='history-content-item'>${content}</div>
                    </div>
                </div>
            </div>
        </div>`)
    }
    private loadData() {
        this._loadData().then((datas: History[] = []) => {
            datas.forEach((data, index) => {
                this.createTimeUnit(data.time).appendTo(this.timePanel)
                this.createTimelineUnit().appendTo(this.timelinePanel)
                const unit = this.createContentUnit(data.content)
                unit.appendTo(this.contentPanel)
            })
        }).catch(console.log)
    }
    private _loadData(): Promise<History[]> {
        return new Promise<History[]>((resolve, reject) => {
            $.ajax({
                url: 'home/history/getList',
                method: 'post',
                success: (data) => {
                    if (data.state) {
                        resolve(data.result)
                    } else {
                        reject()
                    }
                },
                error: reject
            })
        })
    }
}