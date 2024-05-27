#include <bits/stdc++.h>
using namespace std;
void find_ans(vector<int>&arr, int n, int target){
    unordered_set<int> s;
    for(int i = 0; i < n; i++) {
        int curr = target - arr[i];
        if (s.find(curr) != s.end()) {
            cout << "Yes" << endl;
            return;
        }
        s.insert(arr[i]);
    }
    cout << "No" << endl;
    return;
}
int main()
{
    int n,k;
    cin>>n;
    vector<int> v;
    for(int i=0;i<n;i++) {
        cin>>k;
        v.push_back(k);
    }
    int sum;
    cin>>sum;
    find_ans(v,n,sum);

    return 0;
}

