import { EventData, Page, View } from '@nativescript/core'
import { EditModel } from './edit-view-model'

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new EditModel(page.navigationContext)
}