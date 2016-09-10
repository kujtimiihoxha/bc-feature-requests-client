/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DemoHelper.
 * Used only for demo pupose.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export class DemoHelper {
  demoClients:string[] = ["client a","client b","client c"]
  demoUsers:string[] = ["admin","employ","employ1","employ2","employ3"]

  isDemoUser(username: string){
    return this.demoUsers.indexOf(username) !== -1
  }
  isDemoClient(name: string){
    return this.demoClients.indexOf(name) !== -1
  }
}
