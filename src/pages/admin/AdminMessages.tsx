import React from 'react';
import { useMessagesQuery, useDeleteMessage } from '../../api/massageApi';
import { useTranslation } from 'react-i18next';
import dayjs from '../../setup/dayjs';

const AdminMessages = () => {
    const { t } = useTranslation();
    const confirmDeleteMsg = t('admin.messages.confirmDelete');
    const { data: messages = [], isLoading, isError } = useMessagesQuery();
    const deleteMessage = useDeleteMessage();

    if (isLoading) return <p className="text-center mt-10 text-slate-400">{t('admin.messages.loading')}</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">{t('admin.messages.error')}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">{t('admin.messages.title')}</h1>
            {messages.length === 0 ? (
                <p className="text-slate-500">{t('admin.messages.noMessages')}</p>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-4 shadow"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">{msg.fullName}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{msg.email}</p>
                                    <p className="text-sm mt-2">{msg.message}</p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {dayjs(msg.createdAt).format('YYYY-MM-DD HH:mm')}
                                    </p>

                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm(confirmDeleteMsg)) {
                                            deleteMessage.mutate(msg.id);
                                        }
                                    }}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                >
                                    {t('form.delete')}
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMessages;