/* eslint-disable import/no-extraneous-dependencies */
/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';
import api from '../../utils/api';

const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreLoad) {
    return {
        type: ActionType.SET_IS_PRELOAD,
        payload: {
            isPreLoad,
        },
    };
}

function asyncPreloadProcess() {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            // preload process
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            // fallback process
            dispatch(setAuthUserActionCreator(null));
        } finally {
            // end preload process
            dispatch(setIsPreloadActionCreator(false));
        }

        dispatch(hideLoading());
    };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
